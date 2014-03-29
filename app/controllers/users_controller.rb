class UsersController < ApplicationController
  def new
    @user = User.new
  end


  def create
    @user = User.create(user_params)
    @user.save!
    session[:user_id] = @user.id
    redirect_to :back
  end

  def increment
    @user = User.find_by email: (params[:email])
    @user.increment(:pomodoro,by = 1)
    render :nothing => true
  end
end

private

def user_params
      params.require(:user).permit(:name, :password, :remember_me, :email)
end

