class ApplicationController < ActionController::Base
  before_filter CheckUser, CheckVk
  protect_from_forgery

end

