import { forwardRef, useImperativeHandle, useRef } from "react";

const ResultModel = forwardRef(function ResultModel(
  { targetTime, remainingTime, onReset },
  ref
) {
  // we use useImperativeHandle to define properties and methods that should be accessible on this component from outside

  const dialog = useRef();

  const userLost = remainingTime <= 0 ;
  const formattedRemainingTime = (remainingTime / 1000).toFixed(2);
  const score = Math.round((1 - remainingTime / (targetTime * 1000)) * 100);

  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      }
    }
  });

  return (
    <dialog ref={dialog} className="result-modal" onClose={onReset}>
      {userLost && <h2>You lost</h2>}
      {!userLost && <h2>You Score: {score}</h2>}
      <p>
        The target time was <strong>{targetTime} seconds.</strong>
      </p>
      <p>
        You stopped the timer with <strong>{formattedRemainingTime}</strong>
      </p>
      <form method="dialog" onSubmit={onReset}>
        <button>Close</button>
      </form>
    </dialog>
  );
});

export default ResultModel;

/**
 * To make sure that onReset gets triggered when the dialog is closed via the escape key (ESC), you should add the built-in onClose prop to the <dialog> element and bind it to the onReset prop value.
 */
