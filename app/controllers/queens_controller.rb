class QueensController < ApplicationController

  # GET /queens
  # GET /queens.xml
  def search
    words = params[:q].split(" ")
    criterion = {'$or' => [{:first_name => /^#{words[0]}/i}, {:last_name => /^#{words[0]}/i}]}
    if words.length > 1
      criterion['$or'] << {:first_name => /^#{words[1]}/i} << {:last_name => /^#{words[1]}/i}
    end
    @queens = Queen.where(criterion).order_by(:rating=>:desc)
    render :template => 'queens/_list', :layout => false
  end

  # GET /queens
  # GET /queens.xml
  def list
    @queens = Queen.order_by(:rating=>:desc)

    respond_to do |format|
      format.html # list.html.erb
      format.xml { render :xml => @queens }
    end
  end

  # GET /queens/1
  # GET /queens/1.xml
  def show
    @queen = !params[:id].nil? ? Queen.find(params[:id]) : @current_queen
    @rates = @queen.rates_page params[:page]
    respond_to do |format|
      format.html # show.html.erb
      format.xml { render :xml => @queen }
    end
  end

  # PUT /queens/1
  # PUT /queens/1.xml
  def update
    @queen = Queen.find(params[:id])
    if @queen.update_attributes(params[:queen])
      render :json => @queen
    else
      render :json => @queen.errors, :status => :unprocessable_entity
    end
  end

end
