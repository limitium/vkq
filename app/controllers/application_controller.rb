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
    firebug VKQ_CONFIG
    params[:viewer_id] ||= "1111"

    to_vk unless request.referer == "http://vkontakte.ru/app#{VKQ_CONFIG["app_id"]}"
    to_vk unless params[:auth_key] == Digest::MD5.hexdigest("#{VKQ_CONFIG["app_id"]}_#{params[:viewer_id]}_#{VKQ_CONFIG["api_secret"]}")
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
    # redirect_to "http://vkontakte.ru/app#{VKQ_CONFIG["app_id"]}"
  end

  helper_method :firebug
  private
  def firebug(message, type = :debug)
    request.env['firebug.logs'] ||= []
    request.env['firebug.logs'] << [type.to_sym, message.to_s]
  end
end

