export default function style() {
  let steps = document.querySelectorAll('li.step.passed')

  steps.forEach(step => {
    let passed = document.createElement('i');
    passed.innerHTML = "&nbsp;"
    passed.className = "fa fa-check";
    step.prepend(passed);
  })

  steps = document.querySelectorAll('li.step.failed')

  steps.forEach(step => {
    let failed = document.createElement('i')
    failed.innerHTML = "&nbsp;&nbsp;"
    failed.className = "fa fa-times"
    step.prepend(failed)
  })
}