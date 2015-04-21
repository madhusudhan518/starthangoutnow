json.array!(@events) do |event|
  json.extract! event, :id, :name, :description, :starts_at, :visibility, :registration, :reminders
  json.url event_url(event, format: :json)
end
