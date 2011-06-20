class QueensController < ApplicationController
  # GET /queens
  # GET /queens.xml
  def index
    @queens = Queen.all

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @queens }
    end
  end

  # GET /queens/1
  # GET /queens/1.xml
  def show
    @queen = Queen.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @queen }
    end
  end

  # GET /queens/new
  # GET /queens/new.xml
  def new
    @queen = Queen.new

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @queen }
    end
  end

  # GET /queens/1/edit
  def edit
    @queen = Queen.find(params[:id])
  end

  # POST /queens
  # POST /queens.xml
  def create
    @queen = Queen.new(params[:queen])

    respond_to do |format|
      if @queen.save
        format.html { redirect_to(@queen, :notice => 'Queen was successfully created.') }
        format.xml  { render :xml => @queen, :status => :created, :location => @queen }
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @queen.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /queens/1
  # PUT /queens/1.xml
  def update
    @queen = Queen.find(params[:id])

    respond_to do |format|
      if @queen.update_attributes(params[:queen])
        format.html { redirect_to(@queen, :notice => 'Queen was successfully updated.') }
        format.xml  { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @queen.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /queens/1
  # DELETE /queens/1.xml
  def destroy
    @queen = Queen.find(params[:id])
    @queen.destroy

    respond_to do |format|
      format.html { redirect_to(queens_url) }
      format.xml  { head :ok }
    end
  end
end
