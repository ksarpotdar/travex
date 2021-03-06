class Expense < ApplicationRecord
  belongs_to :user
  has_one_attached :image

  enum status: { active: 0, submitted: 1, approved: 2, rejected: 3 }

  validates :location, presence: true, length: { maximum: 100 }
  validates :note, presence: true, allow_blank: true, length: { maximum: 2000 }
  validates :category, presence: true, length: { maximum: 200 }
  validates :payment_method, presence: true, length: { maximum: 200 }
  validates :amount, presence: true, numericality: { only_float: true, greater_than: 0 }
  validates :split, presence: true, numericality: { only_integer: true, greater_than: 0, less_than: 99 }
  validates :date, presence: true
  validates :merchant, presence: true
  validates :user, presence: true

end
