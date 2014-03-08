class SessionsController < ApplicationController
  def new
  end

  def create
    user = User.find_by_email(params[:email])
    if user && user.authenticate(params[:password])
      session[:user_id] = user.id
      redirect_to :back
    else
      puts
      flash.now.alert = "Email or password is invalid"
      redirect_to :back
    end
  end

  def destroy
    session[:user_id] = nil
    redirect_to :back, notice: "Logged out!"
  end
end
