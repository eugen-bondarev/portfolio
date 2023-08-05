window.ANIMA_FORMS_BOILERPLATE_COMPONENTS = {}

import importAll from '../util/importAll'
const contexts = require.context('../components', true, /lazy\.ts$/)
importAll(contexts)

import { registerBlockType, unregisterBlockType } from '@wordpress/blocks'
import { select, dispatch } from '@wordpress/data'
import '@wordpress/block-editor'
import '../frontend/index.scss'
import './index.scss'

wp.blocks.registerBlockStyle('core/button', {
  name: 'light',
  label: 'Light',
})

wp.blocks.registerBlockStyle('core/heading', {
  name: 'subheading',
  label: 'Subheading',
})

wp.blocks.registerBlockStyle('core/heading', {
  name: 'anchor',
  label: 'Anchor',
})

interface AutoloadProps {
  getContext: () => ((key: any) => Record<string, any>) & { keys: any; id: any }
  register: any
  unregister: any
  before: any
  after: any
}

const autoload = ({
  getContext,
  register,
  unregister,
  before = () => null,
  after = () => null,
}: AutoloadProps) => {
  const cache: Record<string, any> = {}
  const loadModules = () => {
    before()

    const context = getContext()
    const changedNames: string[] = []
    context.keys().forEach((key: any) => {
      const module = context(key)
      if (module === cache[key]) {
        return
      }
      if (cache[key]) {
        unregister(cache[key])
      }
      const { name } = module.settings
      if (
        (window as any).wp.blocks
          .getBlockTypes()
          .find((block: any) => block.name === name)
      ) {
        return
      }
      register(module)
      changedNames.push(name)
      cache[key] = module
    })

    after(changedNames)

    // Return the context for HMR initialization.
    return context
  }

  const context = loadModules()

  if ((module as any).hot) {
    ;(module as any).hot.accept(context.id, loadModules)
  }
}

let selectedBlockId: string | null = null
const storeSelectedBlock = () => {
  selectedBlockId = select('core/block-editor').getSelectedBlockClientId()
  dispatch('core/block-editor').clearSelectedBlock()
}
const refreshAllBlocks = (changedNames: string[] = []) => {
  select('core/block-editor')
    .getBlocks()
    .forEach(({ name, clientId }) => {
      if (changedNames.includes(name)) {
        dispatch('core/block-editor').selectBlock(clientId)
      }
    })
  if (selectedBlockId) {
    dispatch('core/block-editor').selectBlock(selectedBlockId)
  } else {
    dispatch('core/block-editor').clearSelectedBlock()
  }
  selectedBlockId = null
}

autoload({
  getContext: () => (require as any).context('./', true, /index\.tsx$/),
  register: ({ settings }: { settings: any }) => {
    return registerBlockType(settings.name, settings)
  },
  unregister: ({ settings }: { settings: any }) =>
    unregisterBlockType(settings.name),
  before: storeSelectedBlock,
  after: refreshAllBlocks,
})

window.addEventListener('DOMContentLoaded', () => {
  const callback = (editorStylesWrapper: Element) => {
    const classesToAdd = ['prose', 'lg:prose-xl', '!container', '!m-auto']

    classesToAdd.forEach((className) =>
      editorStylesWrapper.classList.add(className)
    )
  }

  const intervalId = setInterval(() => {
    const editorStylesWrapper = document.querySelector('.wp-block-post-content')
    if (!editorStylesWrapper) {
      return
    }
    callback(editorStylesWrapper)
    clearInterval(intervalId)
  }, 10)
})

const request = async () => {
  const response = await fetch(`${window.origin}/wp-json/api/v1/test`)
  const body = await response.json()
  window.blocksInjectData = {
    projects: body,
  }
}
request()
