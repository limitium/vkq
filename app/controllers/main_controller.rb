class MainController < ApplicationController

  def page
    params[:viewer_id] # who open
    params[:is_app_user] # 1 -installed , 0 not
    params[:user_id] # if from user page
    params[:api_settings] # bit mask
    params[:hash] #my add params

    @queen = Queen.first(:uid => params[:user_id].to_i)
        NilClass
    if @queen.nil?
      @queen = Queen.new({:uid => params[:user_id]})
      @queen.save
    end

  end

end
