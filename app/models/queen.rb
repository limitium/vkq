class Queen
  include Mongoid::Document
  identity :type => Integer

  field :first_name
  field :last_name
  field :nickname
  field :domain
  field :sex, :type => Integer
  field :bdate
  field :city, :type => Integer
  field :city_name
  field :country, :type => Integer
  field :country_name
  field :photo
  field :photo_rec
  field :photo_medium_rec
  field :photo_big
  field :rate, :type => Integer
  field :mobile_phone
  field :home_phone
  field :faculty, :type => Integer
  field :faculty_name
  field :university, :type => Integer
  field :university_name
  field :graduation, :type => Integer

  field :salt


  key :_id
  index :_id, :unique => true

  def self.authenticate_with_salt(id, cookie_salt)
    if !id.nil?
      user = find(id)
      (user && user.salt == cookie_salt) ? user : nil
    end
  end
end
