'use client';

import { useState, useEffect } from 'react';

interface Goal {
  _id: string;
  type: string;
  title: string;
  description: string;
  order: number;
}

export default function GoalsPage() {
  const [goals2025, setGoals2025] = useState<Goal[]>([]);
  const [longTermGoals, setLongTermGoals] = useState<Goal[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [isAdding, setIsAdding] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    try {
      const response = await fetch('/api/goals');
      const data = await response.json();
      setGoals2025(data.filter((goal: Goal) => goal.type === '2025'));
      setLongTermGoals(data.filter((goal: Goal) => goal.type === 'long-term'));
    } catch (error) {
      console.error('Failed to fetch goals:', error);
    }
  };

  const handleEdit = (goal: Goal) => {
    setEditingId(goal._id);
    setEditTitle(goal.title);
    setEditDescription(goal.description);
  };

  const handleSave = async (id: string) => {
    try {
      await fetch('/api/goals', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id,
          title: editTitle,
          description: editDescription,
        }),
      });
      setEditingId(null);
      fetchGoals();
    } catch (error) {
      console.error('Failed to save goal:', error);
    }
  };

  const handleAdd = async (type: string) => {
    try {
      await fetch('/api/goals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type,
          title: newTitle,
          description: newDescription,
        }),
      });
      setIsAdding(null);
      setNewTitle('');
      setNewDescription('');
      fetchGoals();
    } catch (error) {
      console.error('Failed to add goal:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;
    try {
      await fetch('/api/goals', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      fetchGoals();
    } catch (error) {
      console.error('Failed to delete goal:', error);
    }
  };

  return (
    <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center sm:text-left text-gray-700">
          더 나은 내일을 위해
        </h1>

        <div className="space-y-8 sm:space-y-12">
          {/* 2025년 목표 */}
          <section>
            <div className="flex justify-between items-center mb-4 sm:mb-6">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-600">
                2025년 목표
              </h2>
              <button
                onClick={() => setIsAdding('2025')}
                className="px-3 py-1.5 bg-gray-500 text-white rounded text-sm hover:bg-gray-400 transition-colors"
              >
                목표 추가
              </button>
            </div>

            {isAdding === '2025' && (
              <div className="mb-4 p-4 border border-gray-200 rounded-lg">
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="목표 제목"
                  className="w-full px-3 py-2 mb-2 border border-gray-200 rounded 
                    bg-gray-50 focus:border-gray-300 focus:ring-1 focus:ring-gray-300 
                    focus:outline-none transition-all duration-200 hover:bg-white"
                />
                <textarea
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="목표 설명"
                  className="w-full px-3 py-2 mb-4 border border-gray-200 rounded 
                    bg-gray-50 focus:border-gray-300 focus:ring-1 focus:ring-gray-300 
                    focus:outline-none transition-all duration-200 hover:bg-white resize-none"
                  rows={3}
                />
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => handleAdd('2025')}
                    className="px-4 py-1.5 bg-gray-500 text-white rounded text-sm 
                      hover:bg-gray-400 transform hover:-translate-y-0.5 
                      transition-all duration-200 hover:shadow-md active:translate-y-0"
                  >
                    저장
                  </button>
                  <button
                    onClick={() => setIsAdding(null)}
                    className="px-4 py-1.5 border border-gray-200 rounded text-sm 
                      hover:bg-gray-50 text-gray-600 transition-all duration-200 
                      hover:border-gray-300 hover:shadow-sm"
                  >
                    취소
                  </button>
                </div>
              </div>
            )}

            <div className="bg-white rounded-lg border border-gray-100 p-4 sm:p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:border-gray-300 hover:bg-gray-50 group">
              <ul className="space-y-4 sm:space-y-6">
                {goals2025.map((goal) => (
                  <li
                    key={goal._id}
                    className="flex items-start gap-3 sm:gap-4 p-3 rounded-lg hover:bg-white transition-all duration-200 group/item"
                  >
                    <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                    <div className="flex-1">
                      {editingId === goal._id ? (
                        <div>
                          <input
                            type="text"
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                            className="w-full px-3 py-2 mb-2 border border-gray-200 rounded bg-gray-50 focus:border-gray-300 focus:outline-none transition-colors"
                          />
                          <textarea
                            value={editDescription}
                            onChange={(e) => setEditDescription(e.target.value)}
                            className="w-full px-3 py-2 mb-4 border border-gray-200 rounded bg-gray-50 focus:border-gray-300 focus:outline-none transition-colors resize-none"
                            rows={3}
                          />
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => handleSave(goal._id)}
                              className="px-4 py-1.5 bg-gray-600 text-gray-100 rounded text-sm hover:bg-gray-500 transition-colors"
                            >
                              저장
                            </button>
                            <button
                              onClick={() => setEditingId(null)}
                              className="px-4 py-1.5 border border-gray-200 rounded text-sm hover:bg-gray-50 text-gray-600 transition-colors"
                            >
                              취소
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <div className="flex justify-between items-start">
                            <h3 className="font-medium mb-1 text-base sm:text-lg text-gray-600 group-hover/item:text-gray-800 transition-colors duration-200">
                              {goal.title}
                            </h3>
                            <div className="flex gap-2 opacity-0 group-hover/item:opacity-100 transition-opacity duration-200">
                              <button
                                onClick={() => handleEdit(goal)}
                                className="text-gray-400 hover:text-gray-600 transform 
                                  hover:scale-110 transition-all duration-200 
                                  hover:rotate-12"
                              >
                                <svg
                                  className="w-4 h-4"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                  />
                                </svg>
                              </button>
                              <button
                                onClick={() => handleDelete(goal._id)}
                                className="text-gray-400 hover:text-red-600 transform 
                                  hover:scale-110 transition-all duration-200 
                                  hover:-rotate-12"
                              >
                                <svg
                                  className="w-4 h-4"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                  />
                                </svg>
                              </button>
                            </div>
                          </div>
                          <p className="text-gray-500 text-sm sm:text-base">
                            {goal.description}
                          </p>
                        </div>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* 장기 목표 */}
          <section>
            <div className="flex justify-between items-center mb-4 sm:mb-6">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-600">
                장기 목표
              </h2>
              <button
                onClick={() => setIsAdding('long-term')}
                className="px-3 py-1.5 bg-gray-500 text-white rounded text-sm hover:bg-gray-400 transition-colors"
              >
                목표 추가
              </button>
            </div>

            {isAdding === 'long-term' && (
              <div className="mb-4 p-4 border border-gray-200 rounded-lg">
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="목표 제목"
                  className="w-full px-3 py-2 mb-2 border border-gray-200 rounded 
                    bg-gray-50 focus:border-gray-300 focus:ring-1 focus:ring-gray-300 
                    focus:outline-none transition-all duration-200 hover:bg-white"
                />
                <textarea
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="목표 설명"
                  className="w-full px-3 py-2 mb-4 border border-gray-200 rounded 
                    bg-gray-50 focus:border-gray-300 focus:ring-1 focus:ring-gray-300 
                    focus:outline-none transition-all duration-200 hover:bg-white resize-none"
                  rows={3}
                />
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => handleAdd('long-term')}
                    className="px-4 py-1.5 bg-gray-600 text-gray-100 rounded text-sm hover:bg-gray-500 transition-colors"
                  >
                    저장
                  </button>
                  <button
                    onClick={() => setIsAdding(null)}
                    className="px-4 py-1.5 border border-gray-200 rounded text-sm hover:bg-gray-50 text-gray-600 transition-colors"
                  >
                    취소
                  </button>
                </div>
              </div>
            )}

            <div className="bg-white rounded-lg border border-gray-100 p-4 sm:p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:border-gray-300 hover:bg-gray-50 group">
              <ul className="space-y-4 sm:space-y-6">
                {longTermGoals.map((goal) => (
                  <li
                    key={goal._id}
                    className="flex items-start gap-3 sm:gap-4 p-3 rounded-lg hover:bg-white transition-all duration-200 group/item"
                  >
                    <span className="w-2 h-2 bg-gray-600 rounded-full mt-2 flex-shrink-0"></span>
                    <div className="flex-1">
                      {editingId === goal._id ? (
                        <div>
                          <input
                            type="text"
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                            className="w-full px-3 py-2 mb-2 border border-gray-200 rounded bg-gray-50 focus:border-gray-300 focus:outline-none transition-colors"
                          />
                          <textarea
                            value={editDescription}
                            onChange={(e) => setEditDescription(e.target.value)}
                            className="w-full px-3 py-2 mb-4 border border-gray-200 rounded bg-gray-50 focus:border-gray-300 focus:outline-none transition-colors resize-none"
                            rows={3}
                          />
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => handleSave(goal._id)}
                              className="px-4 py-1.5 bg-gray-600 text-gray-100 rounded text-sm hover:bg-gray-500 transition-colors"
                            >
                              저장
                            </button>
                            <button
                              onClick={() => setEditingId(null)}
                              className="px-4 py-1.5 border border-gray-200 rounded text-sm hover:bg-gray-50 text-gray-600 transition-colors"
                            >
                              취소
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <div className="flex justify-between items-start">
                            <h3 className="font-medium mb-1 text-base sm:text-lg text-gray-600 group-hover/item:text-gray-800 transition-colors duration-200">
                              {goal.title}
                            </h3>
                            <div className="flex gap-2 opacity-0 group-hover/item:opacity-100 transition-opacity duration-200">
                              <button
                                onClick={() => handleEdit(goal)}
                                className="text-gray-400 hover:text-gray-600 transform 
                                  hover:scale-110 transition-all duration-200 
                                  hover:rotate-12"
                              >
                                <svg
                                  className="w-4 h-4"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                  />
                                </svg>
                              </button>
                              <button
                                onClick={() => handleDelete(goal._id)}
                                className="text-gray-400 hover:text-red-600 transform 
                                  hover:scale-110 transition-all duration-200 
                                  hover:-rotate-12"
                              >
                                <svg
                                  className="w-4 h-4"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                  />
                                </svg>
                              </button>
                            </div>
                          </div>
                          <p className="text-gray-500 text-sm sm:text-base">
                            {goal.description}
                          </p>
                        </div>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
