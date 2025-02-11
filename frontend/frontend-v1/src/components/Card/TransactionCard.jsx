import React, { useState } from "react";
import { Calendar, Trash2, Pencil } from "lucide-react";
import { format } from "date-fns";
import * as Dialog from "@radix-ui/react-dialog";

function TransactionCard({
  transaction,
  onDelete,
  onUpdate,
  categoryIcon,
  categories,
}) {
  const [description, setDescription] = useState(transaction.description);
  const [amount, setAmount] = useState(transaction.amount);
  const [categoryId, setCategoryId] = useState(transaction.categoryId);
  const [date, setDate] = useState(transaction.date);

  const handleSaveChanges = () => {
    const updatedTransaction = {
      categoryId,
      amount: parseFloat(amount),
      description,
      date,
      type: transaction.type.toString(), // Ensure type is a string
    };
    console.log("Saving changes:", updatedTransaction); // Log the data being sent
    onUpdate(transaction.id, updatedTransaction);
  };

  return (
    <div className="flex justify-between items-center p-3 border-b bg-white rounded-lg mb-2 shadow-md">
      <div className="flex items-center gap-4">
        <span className="text-gray-600 text-2xl">
          {categoryIcon(transaction.categoryName)}
        </span>
        <div>
          <p className="text-lg font-medium">{transaction.description}</p>
          <p className="text-gray-500 flex items-center">
            ₹{transaction.amount}
          </p>
          <p className="text-gray-500 flex items-center">
            <Calendar size={14} className="mr-1" />
            {format(new Date(transaction.date), "yyyy-MM-dd HH:mm")}
          </p>
        </div>
      </div>
      <div className="flex space-x-2">
        {/* Edit Dialog */}
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <button className="text-blue-500 hover:text-blue-700">
              <Pencil size={18} />
            </button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
            <Dialog.Content className="fixed bg-white p-6 rounded-lg shadow-lg top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <Dialog.Title className="text-lg font-bold">
                Edit Transaction
              </Dialog.Title>
              <Dialog.Description className="mt-2 text-gray-600">
                Make changes to your transaction and save when you're done.
              </Dialog.Description>
              <div className="mt-4 space-y-4">
                <input
                  type="text"
                  placeholder="Description"
                  className="w-full p-2 border rounded-lg"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <input
                  type="number"
                  placeholder="Amount"
                  className="w-full p-2 border rounded-lg"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
                <select
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className="w-full p-2 border rounded-lg"
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                <input
                  type="datetime-local"
                  className="w-full p-2 border rounded-lg"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              <div className="mt-4 flex justify-end space-x-4">
                <Dialog.Close asChild>
                  <button className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400">
                    Discard
                  </button>
                </Dialog.Close>
                <Dialog.Close asChild>
                  <button
                    onClick={handleSaveChanges}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Save Changes
                  </button>
                </Dialog.Close>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
        {/* Delete Dialog */}
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <button className="text-red-500 hover:text-red-700">
              <Trash2 size={18} />
            </button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
            <Dialog.Content className="fixed bg-white p-6 rounded-lg shadow-lg top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <Dialog.Title className="text-lg font-bold">
                Confirm Delete
              </Dialog.Title>
              <Dialog.Description className="mt-2 text-gray-600">
                Are you sure you want to delete this transaction? This action
                cannot be undone.
              </Dialog.Description>
              <div className="mt-4 flex justify-end space-x-4">
                <Dialog.Close asChild>
                  <button className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400">
                    Cancel
                  </button>
                </Dialog.Close>
                <Dialog.Close asChild>
                  <button
                    onClick={() => onDelete(transaction.id)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  >
                    Delete
                  </button>
                </Dialog.Close>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </div>
  );
}

export default TransactionCard;
