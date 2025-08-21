import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Papa from "papaparse";
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
import { mockEmployees } from "@/data/mockData";

const formSchema = z
  .object({
    start: z.string().min(1, { message: "Start date is required" }),
    end: z.string().min(1, { message: "End date is required" }),
    format: z.enum(["csv", "json"]),
  })
  .refine((data) => new Date(data.end) >= new Date(data.start), {
    message: "End date must be after start date",
    path: ["end"],
  });

type FormValues = z.infer<typeof formSchema>;

interface ExportAttendanceReportDialogProps {
  children: React.ReactNode;
}

export function ExportAttendanceReportDialog({ children }: ExportAttendanceReportDialogProps) {
  const [open, setOpen] = useState(false);
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      start: "2024-01-01",
      end: "2024-01-31",
      format: "csv",
    },
  });

  const download = (data: string, filename: string, type: string) => {
    const blob = new Blob([data], { type });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const onSubmit = (values: FormValues) => {
    const attendance = mockEmployees.map(({ name, status }) => ({ name, status }));

    if (values.format === "csv") {
      const csv = Papa.unparse(attendance);
      download(csv, `attendance-${values.start}-to-${values.end}.csv`, "text/csv;charset=utf-8;");
    } else {
      const json = JSON.stringify(attendance, null, 2);
      download(json, `attendance-${values.start}-to-${values.end}.json`, "application/json;charset=utf-8;");
    }

    toast({
      title: "Report Exported",
      description: `Attendance report from ${values.start} to ${values.end} downloaded`,
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Export Attendance Report</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="start"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="end"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>End Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="format"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Format</FormLabel>
                  <FormControl>
                    <select
                      className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1"
                      value={field.value}
                      onChange={field.onChange}
                    >
                      <option value="csv">CSV</option>
                      <option value="json">JSON</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Export</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default ExportAttendanceReportDialog;
