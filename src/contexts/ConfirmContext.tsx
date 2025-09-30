import {
    createContext,
    useContext,
    useState,
    type ReactNode,
  } from "react"
  import * as AlertDialog from "@radix-ui/react-alert-dialog"
  
  interface ConfirmOptions {
    title: string
    detail?: string
    confirmButtonLabel?: string
  }
  
  interface ConfirmContextValue {
    confirm: (options: ConfirmOptions) => Promise<boolean>
  }
  
  const ConfirmContext = createContext<ConfirmContextValue | undefined>(undefined)
  
  export const useConfirm = () => {
    const ctx = useContext(ConfirmContext)
    if (!ctx) throw new Error("useConfirm must be used within ConfirmProvider")
    return ctx
  }
  
  export const ConfirmProvider = ({ children }: { children: ReactNode }) => {
    const [open, setOpen] = useState(false)
    const [resolveFn, setResolveFn] = useState<((value: boolean) => void) | null>(null)
    const [options, setOptions] = useState<ConfirmOptions>({ title: "" })
  
    const confirm = (opts: ConfirmOptions) => {
        setOptions(opts)
        setOpen(true)
        return new Promise<boolean>((resolve) => {
          setResolveFn(() => resolve)
        })
      }
  
    const handleAction = (result: boolean) => {
      if (resolveFn) resolveFn(result)
      setOpen(false)
    }
  
    return (
      <ConfirmContext.Provider value={{ confirm }}>
        {children}
        <AlertDialog.Root open={open} onOpenChange={setOpen}>
          <AlertDialog.Portal>
            <AlertDialog.Overlay className="fixed inset-0 bg-black/50" />
            <AlertDialog.Content className="fixed top-1/2 left-1/2 w-80 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-4 shadow">
              <AlertDialog.Title className="font-semibold text-lg">{options.title}</AlertDialog.Title>
              {options.detail && (
                <AlertDialog.Description className="mt-2 text-gray-600 text-sm">
                  {options.detail}
                </AlertDialog.Description>
              )}
              <div className="flex justify-end gap-2 mt-4">
                <AlertDialog.Cancel asChild>
                  <button
                    className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
                    onClick={() => handleAction(false)}
                  >
                    취소
                  </button>
                </AlertDialog.Cancel>
                <AlertDialog.Action asChild>
                  <button
                    className="px-3 py-1 rounded bg-blue-500 text-white hover:bg-blue-600"
                    onClick={() => handleAction(true)}
                  >
                    {options.confirmButtonLabel ?? "확인"}
                  </button>
                </AlertDialog.Action>
              </div>
            </AlertDialog.Content>
          </AlertDialog.Portal>
        </AlertDialog.Root>
      </ConfirmContext.Provider>
    )
  }