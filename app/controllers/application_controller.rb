class ApplicationController < ActionController::Base
  require "digest"
  before_filter :check_vk, :check_user
  protect_from_forgery

  def check_user
    begin
      @queen = Queen.find(params[:viewer_id])
    rescue Mongoid::Errors::DocumentNotFound
      sign_up
    ensure
      sign_in
    end
  end

  def check_vk
    params[:viewer_id] ||= "1111"
    @tt1 = params[:auth_key]
    @tt2 = Digest::MD5.hexdigest("2384663_" + params[:viewer_id] + "_R4abU0gbz59Y9JKo3lqI")
#should be checked at checkVK!!!!
#    redirect_to "http://vkontakte.ru/app2384663" unless request.referer == "http://vkontakte.ru/app2384663";
  end

  def sign_up
    @queen = Queen.create(:_id => params[:viewer_id])
    @update_profile = true
    @queen.save
  end

  def sign_in

  end

end

