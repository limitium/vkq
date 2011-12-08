class VotesController < ApplicationController
  # POST /votes
  # POST /votes.xml
  def create
    if data_is_valid?
      add_vote_data
      @vote = Vote.new(params[:vote])
      if @vote.save!
          @vote.rated.rating = @vote.rated.rating.to_i + @vote.value
          @vote.rated.save
        render :json => {:rating => @vote.rated.rating, :position => @queen.position}
      else
        render :json => @vote.errors, :status => :unprocessable_entity
      end
    end
  end

  # GET /votes
  # GET /votes.xml
  def load
    @rates = Queen.find(params[:vote][:id]).rates_page params[:vote][:page]
    render :template => 'vote/_vote', :layout => false
  end

  private

  def add_vote_data
    params[:vote][:voter] = @current_queen._id
    params[:vote][:voter_data] = {
        :_id => @current_queen._id,
        :first_name =>@current_queen.first_name,
        :last_name =>@current_queen.last_name,
        :nickname =>@current_queen.nickname,
        :photo_rec =>@current_queen.photo_rec,
        :rating =>@current_queen.rating
    }
    params[:vote][:value] = @current_queen.force * (params[:vote][:value].to_i == 1 ? 1 : -1)
  end

  def data_is_valid?
    @queen = Queen.find(params[:vote][:rated])
    !@queen.nil?
  end

end
