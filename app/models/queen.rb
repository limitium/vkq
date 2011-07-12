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

  field :rating, :type => Integer
  field :salt

  attr_accessible :first_name, :last_name, :nickname, :domain, :sex, :bdate, :city, :city_name, :country, :country_name, :photo, :photo_rec, :photo_medium_rec, :photo_big, :rate, :mobile_phone, :home_phone, :faculty, :faculty_name, :university, :university_name, :graduation
  key :_id
  index :_id, :unique => true

  references_many :votes, :class_name => 'Vote', :inverse_of => :voter
  references_many :rates, :class_name => 'Vote', :inverse_of => :rated


  def self.authenticate_with_salt(id, cookie_salt)
    if !id.nil?
      user = find(id)
      (user && user.salt == cookie_salt) ? user : nil
    end
  end

  before_create :set_created_at
  before_update :set_updated_at

  protected
  def set_created_at
    self.created_at= Time.now.to_i
  end

  def set_updated_at
    self.updated_at = Time.now.to_i
  end
end
