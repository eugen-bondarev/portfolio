const BUTTON_STAGES = ['loading', 'success', 'inactive', 'restore'] as const

export type ButtonStage = typeof BUTTON_STAGES[number]

interface AddButtonAction<T> {
  button: HTMLElement
  stages?: ButtonStage[]
  before?: () => Promise<T>
  action: () => Promise<T>
  after?: () => Promise<T>
}

export const addButtonAction = async <T>({
  button,
  stages = BUTTON_STAGES as unknown as ButtonStage[],
  before,
  action,
  after,
}: AddButtonAction<T>) => {
  if (before) {
    await before()
  }
  if (stages.includes('loading')) {
    button.classList.add('loading')
  }
  await action()
  if (stages.includes('loading')) {
    button.classList.remove('loading')
  }
  if (stages.includes('success')) {
    button.classList.add('success')
  }
  if (stages.includes('inactive')) {
    button.classList.add('inactive')
  }
  if (stages.includes('restore')) {
    setTimeout(() => {
      button.classList.remove('inactive')
      button.classList.remove('success')
    }, 750)
  }
  if (after) {
    await after()
  }
}
