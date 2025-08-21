import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";

const formSchema = z.object({
  file: z
    .any()
    .refine(
      (files) => files instanceof FileList && files.length > 0,
      "CSV file is required"
    ),
});

interface ImportEmployeesDialogProps {
  children: React.ReactNode;
  onImported?: () => void;
}

export function ImportEmployeesDialog({ children, onImported }: ImportEmployeesDialogProps) {
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      file: undefined,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const file = (values.file as FileList)[0];
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/employees/import", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      toast({
        title: "Import Successful",
        description: `${data.imported} employees imported`,
      });
      setOpen(false);
      form.reset();
      onImported?.();
    } catch (err) {
      toast({
        title: "Import Failed",
        description: (err as Error).message,
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Import Employees</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="file"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CSV File</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept=".csv"
                      onChange={(e) => field.onChange(e.target.files)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Import</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default ImportEmployeesDialog;
