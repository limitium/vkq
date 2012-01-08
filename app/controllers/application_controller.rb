class ApplicationController < ActionController::Base
  require "digest"
  before_filter :filter_user

  def filter_user
    if check_params
      sign_in_or_up
    else
      to_vk unless signed_in?
    end
  end

  def check_params
#    return !params[:viewer_id].nil?
    # remove this on product
    # request.referer[0, 30] == "http://vkontakte.ru/app#{VKQ_CONFIG["app_id"]}" &&
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
    @queen = Queen.create!(:_id => params[:viewer_id])
  end

  def sign_in
    @queen.salt = Digest::SHA2.hexdigest("#{Time.now.utc}--#{Vkq::Application.config.secret_token}")
    @queen.save
    cookies.permanent.signed[:_vkq_remember_token] = [@queen._id, @queen.salt]
    @update_profile = true
    self.current_queen = @queen

    if !params[:queen_id].nil?
      to_caller
    end
  end

  def to_caller
    redirect_to queen_show_path params[:queen_id]
  end

  def to_vk
    redirect_to "http://vkontakte.ru/app#{VKQ_CONFIG["app_id"]}"
  end

  def signed_in?
    !current_queen.nil?
  end

  def current_queen=(user)
    @current_queen = user
  end

  def current_queen
    @current_queen ||= user_from_remember_token
  end


  helper_method :firebug
  private

  def user_from_remember_token
    Queen.authenticate_with_salt(*remember_token)
  end

  def remember_token
    cookies.signed[:_vkq_remember_token] || [nil, nil]
  end

  def firebug(message, type = :debug)
    request.env['firebug.logs'] ||= []
    request.env['firebug.logs'] << [type.to_sym, message.to_s]
  end

end

