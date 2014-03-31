class UsersController < ApplicationController
  def new
    @user = User.new
  end


  def create
    @user = User.create(user_params)
    p @user
    @user.save!
    session[:user_id] = @user.id
    redirect_to :back
  end

  def increment
    @user = current_user
    @user.increment(:pomodoro,by = 1)
    @user.save!
    render :nothing => true
  end
end

private

def user_params
      params.require(:user).permit(:name, :password, :remember_me, :email)
end

