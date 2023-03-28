import styles from "./Button.module.css";

function Button({ primary, secondary, children, className, ...props }) {
  let classBtn = [];

  classBtn.push(className);
 
  if (!!primary + !!secondary > 1)
    throw new Error("only one variant is allowed (primary, secondary)");

  if (primary) classBtn.push(styles.btn_primary);
  else if (secondary) classBtn.push(styles.btn_secondary);
  else classBtn.push(styles.btn_common);


  return (
    <button className={`${classBtn.join(" ")} ${styles.btn} `} {...props}>
      {children}
    </button>
  );
}

export default Button;
