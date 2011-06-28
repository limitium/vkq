class ApplicationController < ActionController::Base
  require "digest"
  before_filter :filter_vk, :filter_user
  protect_from_forgery

  def filter_vk
    to_vk unless request.referer == "http://vkontakte.ru/app#{VKQ_CONFIG["app_id"]}"
  end

  def filter_user
    if check_params
      sign_in_or_up
    else
      to_vk unless signed_in?
    end
  end

  def check_params
    to_vk unless params[:auth_key] == Digest::MD5.hexdigest("#{VKQ_CONFIG["app_id"]}_#{params[:viewer_id]}_#{VKQ_CONFIG["api_secret"]}")
    # remove this on product
    params[:auth_key] == Digest::MD5.hexdigest("#{VKQ_CONFIG["app_id"]}_#{params[:viewer_id]}_#{VKQ_CONFIG["api_secret"]}")
  end

  def sign_in_or_up
    begin
      @queen = Queen.find(params[:viewer_id])
    rescue Mongoid::Errors::DocumentNotFound
      sign_up
    ensure
      sign_in
    end
  end


  def sign_up
    @queen = Queen.create(:_id => params[:viewer_id])
    @update_profile = true
  end

  def sign_in
    @queen.salt = Digest::SHA2.hexdigest("#{Time.now.utc}--#{Vkq::Application.config.secret_token}")
    @queen.save
    cookies.permanent.signed[:remember_token] = [@queen._id, @queen.salt]
    self.current_user = @queen
  end

  def to_vk
    redirect_to "http://vkontakte.ru/app#{VKQ_CONFIG["app_id"]}"
  end

  def signed_in?
    !current_user.nil?
  end

  def current_user=(user)
    @current_user = user
  end

  def current_user
    @current_user ||= user_from_remember_token
  end


  helper_method :firebug
  private

  def user_from_remember_token
    Queen.authenticate_with_salt(*remember_token)
  end

  def remember_token
    cookies.signed[:remember_token] || [nil, nil]
  end

  def firebug(message, type = :debug)
    request.env['firebug.logs'] ||= []
    request.env['firebug.logs'] << [type.to_sym, message.to_s]
  end

end

