class VotesController < ApplicationController
  # POST /votes
  # POST /votes.xml
  def create
  	params[:vote][:voter] = @current_queen._id

    params[:vote][:voterName] = @current_queen._id
    params[:vote][:voterAva] = @current_queen._id
    params[:vote][:voterRating] = @current_queen.rating
#    @todo: add force value
    @vote = Vote.new(params[:vote])
    if @vote.save
        @vote.rated.rating = @vote.rated.rating.to_i + @vote.value
        @vote.rated.save
	    render :json => @vote.rated.rating
    else        
       render :json => @vote.errors, :status => :unprocessable_entity
    end
  end

  # POST /votes
  # POST /votes.xml
  def load
  	params[:vote][:voter] = @current_queen._id

    params[:vote][:voterName] = @current_queen._id
    params[:vote][:voterAva] = @current_queen._id
    params[:vote][:voterRating] = @current_queen.rating
#    @todo: add force value
    @vote = Vote.new(params[:vote])
    if @vote.save
        @vote.rated.rating = @vote.rated.rating.to_i + @vote.value
        @vote.rated.save
	    render :json => @vote.rated.rating
    else
       render :json => @vote.errors, :status => :unprocessable_entity
    end
  end
end
