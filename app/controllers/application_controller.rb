class ApplicationController < ActionController::Base
  protect_from_forgery



  private
  def current
    @current ||= User.find_by(email: params[:session][:email])
    p @current
    @current
  end
  helper_method :current
end


