class AchivesController < ApplicationController
  # GET /achives
  # GET /achives.xml
  def index
    @achives = Achive.all

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @achives }
    end
  end

  # GET /achives/1
  # GET /achives/1.xml
  def show
    @achive = Achive.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @achive }
    end
  end

  # GET /achives/new
  # GET /achives/new.xml
  def new
    @achive = Achive.new

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @achive }
    end
  end

  # GET /achives/1/edit
  def edit
    @achive = Achive.find(params[:id])
  end

  # POST /achives
  # POST /achives.xml
  def create
    @achive = Achive.new(params[:achive])

    respond_to do |format|
      if @achive.save
        format.html { redirect_to(@achive, :notice => 'Achive was successfully created.') }
        format.xml  { render :xml => @achive, :status => :created, :location => @achive }
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @achive.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /achives/1
  # PUT /achives/1.xml
  def update
    @achive = Achive.find(params[:id])

    respond_to do |format|
      if @achive.update_attributes(params[:achive])
        format.html { redirect_to(@achive, :notice => 'Achive was successfully updated.') }
        format.xml  { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @achive.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /achives/1
  # DELETE /achives/1.xml
  def destroy
    @achive = Achive.find(params[:id])
    @achive.destroy

    respond_to do |format|
      format.html { redirect_to(achives_url) }
      format.xml  { head :ok }
    end
  end
end
