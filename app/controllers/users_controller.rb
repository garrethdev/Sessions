class UsersController < ApplicationController
  def new
    @user = User.new
  end

  def create
     @user = User.create(params[:user])
      @user.save!
      session[:user_id] = @user.id
      redirect_to :back
  end
end
