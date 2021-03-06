module Api
  class ExpensesController < ApplicationController
    skip_before_action :verify_authenticity_token
    def create
      token = cookies.signed[:travex_session_token]
      session = Session.find_by(token: token)
      user = session.user
      expense = user.expenses.new(expense_params)
      if expense.save
        render 'api/expenses/create', status: :ok
      else
        render json: { success: false }, status: :bad_request
      end
    end

    def index
      #@expenses = Expense.all
      @expenses = Expense.where(user_id: params[:user_id])
      render 'api/expenses/index', status: :ok
    end

    def index_all
      @data = Expense.joins(:user)

      #render json: { expenses: @trips  }
      #@expenses = Expense.all
      #render 'api/expenses/index_all', status: :ok
    end

    def show
      @expense = Expense.find_by(id: params[:id])
      render 'api/expenses/show', status: :ok
    end

    def update

      expense = Expense.find_by(id: params[:id])
      expense.update_attributes(expense_params)

      if expense.save
        render json: expense
        #render 'api/edit/:id', status: :ok
      else
        render json: { success: false }, status: :bad_request
      end

    end

    def update_submitted
      expense = Expense.find_by(id: params[:id])
      expense.status = 'submitted'
      
      if expense.save 
        render json: expense
        #render 'api/edit/:id', status: :ok
      else
        render json: { success: false }, status: :bad_request
      end
    end

    def update_approved
      expense = Expense.find_by(id: params[:id])
      expense.status = 'approved'
      
      if expense.save        
        render json: expense
        #render 'api/edit/:id', status: :ok
      else
        render json: { success: false }, status: :bad_request
      end
    end

    def update_rejected
      expense = Expense.find_by(id: params[:id])
      expense.status = 'rejected'
      
      if expense.save     
        render json: expense
        #render 'api/edit/:id', status: :ok
      else
        render json: { success: false }, status: :bad_request
      end
    end

    def destroy
      token = cookies.signed[:travex_session_token]
      session = Session.find_by(token: token)

      return render json: { success: false } unless session

      user = session.user
      expense = Expense.find_by(id: params[:id])

      if expense and expense.user == user and expense.destroy
        render json: {
          success: true
        }
      else
        render json: {
          success: false
        }
      end
    end


    private

   def expense_params
     params.require(:expense).permit(:date, :merchant, :location, :amount, :split, :category, :payment_method, :note, :image)
   end
  end
end
