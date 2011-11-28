class QueensController < ApplicationController
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
    @queen = Queen.find(params[:id])

    @pluses = Vote.count :conditions => {:rated_id=>@queen._id, :value=>1}
    @total = Vote.count :conditions => {:rated_id=>@queen._id}

    @pluses_self = Vote.count :conditions => {:voter_id=>@queen._id, :value=>1}
    @total_self = Vote.count :conditions => {:voter_id=>@queen._id}

    @rates = @queen.rates.order_by(:created_at=>:desc).page(params[:page]).per(7)
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
