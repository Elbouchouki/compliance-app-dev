import { Dictionnary } from '@/types';
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

import en from '@/lang/en.json'
import ar from '@/lang/ar.json'

interface LangStore {
  lang: "ar" | "en",
  rtl: boolean,
  changeLang: (lang: "ar" | "en") => void
  getDictionary: () => Dictionnary
}

const dictionary = {
  en,
  ar
}

const useLangStore = create<LangStore>()(
  devtools(
    persist(
      (set, get) => ({
        lang: "en",
        rtl: false,
        changeLang: (lang: "ar" | "en") => {
          set(() => ({
            lang: lang,
            rtl: lang === "ar",
          }))
        },
        getDictionary: () => {
          return dictionary[get().lang]
        }
      }),
      {
        name: 'lang',
      }
    )
  )
)

export default useLangStore;