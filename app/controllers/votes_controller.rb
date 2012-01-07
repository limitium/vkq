class VotesController < ApplicationController
  # POST /votes
  # POST /votes.xml
  def create
    if data_is_valid?
      cleanup
      vote_add_voter_data
      @vote = Vote.new(params[:vote])
      if @vote.save!
        queen_add_vote_data
        render :json => {:rating => @queen.rating, :position => @queen.position}
      else
        render :json => @vote.errors, :status => :unprocessable_entity
      end
    end
  end

  # GET /votes
  # GET /votes.xml
  def preload
    @rates = Queen.find(params[:vote][:id]).rates_page params[:vote][:page]
    render :template => 'vote/_vote', :layout => false
  end

  private

  def cleanup
    params[:vote][:value] = @current_queen.force * (params[:vote][:value].to_i == 1 ? 1 : -1)
    if params[:vote][:message].length > 140
      params[:vote][:message] = params[:vote][:message][0, 140];
    end
  end

  def get_voter_hash
    {
        :_id => @current_queen._id,
        :first_name =>@current_queen.first_name,
        :last_name =>@current_queen.last_name,
        :nickname =>@current_queen.nickname,
        :photo_rec =>@current_queen.photo_rec,
        :rating =>@current_queen.rating
    }
  end

  def vote_add_voter_data
    params[:vote][:voter] = @current_queen._id
    params[:vote][:voter_data] = get_voter_hash
  end

  def queen_add_vote_data
    @queen.rating = @queen.rating.to_i + @vote.value
    @queen.last_vote = get_voter_hash
    @queen.last_vote[:message] = params[:vote][:message]
    @queen.last_vote[:value] = params[:vote][:value]
    @queen.save
  end

  def data_is_valid?
    @queen = Queen.find(params[:vote][:rated])
    !@queen.nil?
  end

end
