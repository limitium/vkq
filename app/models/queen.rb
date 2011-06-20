class Queen
  include MongoMapper::Document

  key :uid, Integer
  key :first_name, String
  key :last_name, String
  key :domain, String
  key :sex, String
  key :bdate, String
  key :city, String
  key :country, String
  key :photo, String
  key :photo_medium, String
  key :photo_big, String
  key :university_name, String
  key :faculty, String
  key :faculty_name, String
  key :graduation, String


end

Queen.ensure_index [[:uid, 1]], :unique => true