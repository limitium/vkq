class QueensController < ApplicationController
  #base list
  def list
    get_queens_and_paginate
  end

  #load table
  def load
    get_queens_and_paginate
    render :template => 'queens/_load', :layout => false
  end

  #preload rows
  def preload
    get_queens_and_paginate
    render :template => 'queens/_list', :layout => false
  end

  def show
    @queen = !params[:id].nil? ? Queen.find(params[:id]) : @current_queen
    @rates = @queen.rates_page params[:page]
  end

  def update
    @queen = Queen.find(params[:id])
    if @queen.update_attributes(params[:queen])
      render :json => @queen
    else
      render :json => @queen.errors, :status => :unprocessable_entity
    end
  end

  private

  def get_queens_and_paginate
    criterion = {}
    if !params[:q].nil?
      @search = true
      words = params[:q].split(" ")
      criterion = {'$or' => [{:first_name => /^#{words[0]}/i}, {:last_name => /^#{words[0]}/i}]}
      if words.length > 1
        criterion['$or'] << {:first_name => /^#{words[1]}/i} << {:last_name => /^#{words[1]}/i}
      end
    end
    @per_page = 7
    @queens = Queen.where(criterion).order_by(:rating=>:desc).page(params[:page]).per(@per_page)
  end

end
