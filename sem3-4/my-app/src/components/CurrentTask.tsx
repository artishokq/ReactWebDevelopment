import React, { useRef, useEffect } from "react";

interface CurrentTaskProps {
  currentTask: string;
}

const CurrentTask: React.FC<CurrentTaskProps> = ({ currentTask }) => {
  const prevTaskRef = useRef<string>("");

  useEffect(() => {
    if (currentTask) {
      prevTaskRef.current = currentTask;
    }
  }, [currentTask]);

  const prevTask = prevTaskRef.current;

  return (
    <div className="task-tracker">
      {(currentTask || prevTask) && (
        <>
          <h3>Отслеживание задач:</h3>
          <div className="task-info">
            <p>
              <strong>Текущая задача:</strong> {currentTask || "Не выбрана"}
            </p>
            <p>
              <strong>Предыдущая задача:</strong> {prevTask || "Не было"}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default CurrentTask;
