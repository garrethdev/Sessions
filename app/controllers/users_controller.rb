class UsersController < ApplicationController
  def create
      @user = User.new(username: params[:user][:username], password: params[:user][:password])
      if @user.save
        redirect_to :back
      end
  end
end
