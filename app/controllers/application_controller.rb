class ApplicationController < ActionController::Base
  before_filter :check_vk, :check_user
  protect_from_forgery

  def check_user
    params[:viewer_id] ||= "1111" #should be checked at checkVK!!!!
    begin
      @queen = Queen.find(params[:viewer_id])
    rescue Mongoid::Errors::DocumentNotFound
      sign_up
    ensure
      sign_in
    end
  end

  def check_vk
    @rr = request.referer;
  end

  def sign_up
    @queen = Queen.create(:_id => params[:viewer_id])
    @update_profile = true
    @queen.save
  end

  def sign_in

  end

end

