class MainController < ApplicationController

  def page
    params[:viewer_id] # who open
    params[:is_app_user] # 1 -installed , 0 not
    params[:user_id] # if from user page
    params[:api_settings] # bit mask
    params[:hash] #my add params

    @queen = Queen.find(params[:user_id])

    if !@queen
      @queen = Queen.new({:uid => params[:user_id]})
      @queen.save
    end
    respond_to do |format|
      format.html # show.html.erb
      format.xml { render :xml => @queen }
    end
  end

end
