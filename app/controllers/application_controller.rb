class ApplicationController < ActionController::Base
  before_filter CheckVk, CheckUser
  protect_from_forgery

end

