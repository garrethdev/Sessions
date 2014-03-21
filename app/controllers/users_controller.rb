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
end

private

def user_params
      params.require(:user).permit(:name, :password, :password_confirmation, :remember_me, :email)
end

