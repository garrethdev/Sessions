class NamesController < ApplicationController
  def index
    puts "INDEX HIT *****"
    if params[:id] != nil
      @user =User.find_by (params[:id])
    end
    if @user == nil
      @user = User.new
    end
  end
end
