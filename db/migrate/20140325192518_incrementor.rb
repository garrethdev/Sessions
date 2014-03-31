class Incrementor < ActiveRecord::Migration
  def change
    add_column :users, :pomodoro, :integer, :default => 2
  end
end
