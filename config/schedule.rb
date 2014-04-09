set :output, "/log/cron.log"

every 1.day, at: "2:52 pm" do
  rake "db:reset_pomodoro", :output => {:error => 'error.log', :standard => 'cron.log'}
end
