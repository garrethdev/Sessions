class Incrementor < ActiveRecord::Migration
  def change
    add_column :users, :pomodoro, :integer
  end
end
