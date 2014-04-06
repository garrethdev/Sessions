set :output, "/log/cron.log"

every 1.day, at: "1:52 pm" do
  rake "db:reset_pomodoro", :output => {:error => 'error.log', :standard => 'cron.log'}
end
