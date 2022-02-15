import React, { useState } from "react";
import "./TaskCard.css";

import { updateTask } from "../../store/slices/tasksSlice";
import { useDispatch } from "react-redux";
import { FiCalendar } from "react-icons/fi";
import { CgClose } from "react-icons/cg";
import { formatDate, formatInterval, formatTime } from "../../utils/days";
import useIsMounted from "../../hooks/useIsMounted";
import getPriorityLevel from "../../utils/getPriorityLevel";

import CheckButton from "../CheckButton/CheckButton";
import IconButton from "../IconButton/IconButton";
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";

const TaskCard = ({
  task,
  onClick,
  background,
  border,
  verticalMargin,
  defaultCursor,
  showRemoveProjectIdButton,
  useCompletedDate,
}) => {
  const dispatch = useDispatch();

  const isMounted = useIsMounted();

  const [updating, setUpdating] = useState(false);
  const [waitingForResponse, setWaitingForResponse] = useState(false);

  const handleCompletedButton = async () => {
    setUpdating(true);

    await dispatch(
      updateTask({
        taskId: task.taskId,
        taskName: task.taskName,
        taskDescription: task.taskDescription,
        taskCompleted: !task.taskCompleted,
        startDate: task.startDate,
        endDate: task.endDate,
        startTime: task.startTime,
        endTime: task.endTime,
        projectId: task.projectId,
        priority: task.priority,
      })
    ).unwrap();

    if (isMounted) setUpdating(false);
  };

  const getStyles = () => {
    let cln = "task-card";

    if (background) cln += " task-card--background";
    if (border) cln += " task-card--border";
    if (verticalMargin) cln += " task-card--vertical-margin";

    return cln;
  };

  const getContentStyles = () => {
    let cln = "task-card__content";

    if (defaultCursor) cln += " task-card__content--default-cursor";

    return cln;
  };

  const getPriorityStyles = (priority) => {
    let cln = "task-card__priority";

    if (priority === 1) cln += " task-card__priority--important";
    else if (priority === 2) cln += " task-card__priority--urgent";

    return cln;
  };

  const handleClick = () => onClick(task.taskId);

  const handleRemoveProjectId = async () => {
    setWaitingForResponse(true);

    await dispatch(
      updateTask({
        taskId: task.taskId,
        taskName: task.taskName,
        taskDescription: task.taskDescription,
        taskCompleted: task.taskCompleted,
        startDate: task.startDate,
        endDate: task.endDate,
        startTime: task.startTime,
        endTime: task.endTime,
        projectId: null,
      })
    );
  };

  return (
    <div className={getStyles()}>
      <div className="task-card__header">
        <CheckButton
          loading={updating}
          onClick={handleCompletedButton}
          disabled={!task.canEdit}
          size="small"
          check={task.taskCompleted}
        />
      </div>
      <div className={getContentStyles()} onClick={handleClick}>
        <div className="task-card__name">{task.taskName}</div>

        <div className="task-card__bottom">
          {task.startDate && (
            <div className="task-card__date-section">
              {useCompletedDate ? (
                <>
                  completed:
                  <div className="task-card__date">
                    <span className="task-card__date-span">
                      {formatDate(task.completedAt)}
                    </span>
                    <span className="task-card__date-span">
                      {formatTime(task.completedAt)}
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <FiCalendar />
                  <div className="task-card__date">
                    {formatDate(task.startDate)}
                  </div>
                  {task.startTime &&
                    (task.endTime ? (
                      <div className="task-card__time">
                        {formatInterval(task.startDate, task.endDate, true)}
                      </div>
                    ) : (
                      <div className="task-card__time">
                        {formatTime(task.startDate)}
                      </div>
                    ))}
                </>
              )}
            </div>
          )}
          {(task.priority === 1 || task.priority === 2) && (
            <div className="task-card__priority-section">
              <span className={getPriorityStyles(task.priority)}>
                {getPriorityLevel(task.priority)}
              </span>
            </div>
          )}
        </div>
      </div>
      <div className="task-card__actions">
        {showRemoveProjectIdButton &&
          (waitingForResponse ? (
            <IconButton>
              <LoadingIndicator size="small" />
            </IconButton>
          ) : (
            <IconButton
              onClick={handleRemoveProjectId}
              disabled={!task.canEdit}
            >
              <CgClose />
            </IconButton>
          ))}
      </div>
    </div>
  );
};

export default TaskCard;
