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
    firebug "hello world!"

    params[:viewer_id] ||= "1111"

    to_vk unless request.referer == "http://vkontakte.ru/app2384663"
    to_vk unless params[:auth_key] == Digest::MD5.hexdigest("2384663_" + params[:viewer_id] + "_R4abU0gbz59Y9JKo3lqI")
  end

  def sign_up
    @queen = Queen.create(:_id => params[:viewer_id])
    @update_profile = true
    @queen.save
  end

  def sign_in

  end

  def to_vk
    @tt1 = "to vk"
#    redirect_to "http://vkontakte.ru/app2384663"
  end

  helper_method :firebug
  private
  def firebug(message, type = :debug)
    request.env['firebug.logs'] ||= []
    request.env['firebug.logs'] << [type.to_sym, message.to_s]
  end
end

