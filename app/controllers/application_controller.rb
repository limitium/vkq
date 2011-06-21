class ApplicationController < ActionController::Base
  before_filter :check_vk, :check_user
  protect_from_forgery

  def check_user
    params[:user_id] ||= "1111" #should be checked at checkVK!!!!
    begin
      @queen = Queen.find(params[:user_id])
    rescue Mongoid::Errors::DocumentNotFound
      @queen = Queen.new(:_id => params[:user_id])
      @queen.save
      @update_profile = true;
    end
  end

  def check_vk

  end

end

