
"use client";

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { Loader2, Plus, Trash2, Calendar as CalendarIcon, Download } from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const schema = z.object({
    clientName: z.string().min(1, "Client Name is required"),
    programName: z.string().min(1, "Program Name is required"),
    startDate: z.string().min(1, "Start Date is required"),
    endDate: z.string().min(1, "End Date is required"),
    modules: z.array(z.object({
        name: z.string().min(1, "Module Name is required"),
        date: z.string().min(1, "Date is required"),
        facilitator: z.string().optional(),
    })),
});

type ProgramFormValues = z.infer<typeof schema>;

export default function CreateProgramPage() {
    const [isGenerating, setIsGenerating] = useState(false);

    const { register, control, handleSubmit, formState: { errors } } = useForm<ProgramFormValues>({
        resolver: zodResolver(schema),
        defaultValues: {
            modules: [{ name: "Induction", date: "", facilitator: "" }],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "modules",
    });

    const generatePDF = (data: ProgramFormValues) => {
        setIsGenerating(true);
        const doc = new jsPDF();

        // Placeholder for Logo (would fetch from URL or base64)
        // doc.addImage(...) 

        // Header
        doc.setFontSize(22);
        doc.setTextColor(40, 40, 40);
        doc.text("Learnership Rollout Plan", 105, 20, { align: "center" });

        doc.setFontSize(12);
        doc.setTextColor(100, 100, 100);
        doc.text(`Client: ${data.clientName}`, 20, 40);
        doc.text(`Program: ${data.programName}`, 20, 50);
        doc.text(`Duration: ${data.startDate} to ${data.endDate}`, 20, 60);

        // Modules Table
        const tableData = data.modules.map(m => [m.name, m.date, m.facilitator || "TBD"]);

        (doc as any).autoTable({
            startY: 70,
            head: [['Module / Event', 'Date', 'Facilitator']],
            body: tableData,
            theme: 'grid',
            headStyles: { fillColor: [66, 133, 244] }, // Blue header
        });

        // Save
        doc.save(`${data.clientName}_Rollout_Plan.pdf`);
        setIsGenerating(false);
    };

    const onSubmit = async (data: ProgramFormValues) => {
        // Save to DB (mock)
        console.log("Saving to DB:", data);
        // Then Generate PDF
        generatePDF(data);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Create New Rollout Plan</h1>
                <p className="text-gray-500 dark:text-gray-400">Enter the details for the learnership program.</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 bg-white p-8 rounded-xl shadow-sm border border-gray-200 dark:bg-zinc-900 dark:border-gray-800">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Client Name</label>
                        <input {...register("clientName")} className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-800 dark:border-gray-700" placeholder="e.g. The Windfarm" />
                        {errors.clientName && <p className="text-sm text-red-500">{errors.clientName.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Program Name</label>
                        <input {...register("programName")} className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-800 dark:border-gray-700" placeholder="e.g. Retail Supervisor L4" />
                        {errors.programName && <p className="text-sm text-red-500">{errors.programName.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Start Date</label>
                        <input type="date" {...register("startDate")} className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-800 dark:border-gray-700" />
                        {errors.startDate && <p className="text-sm text-red-500">{errors.startDate.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">End Date</label>
                        <input type="date" {...register("endDate")} className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-800 dark:border-gray-700" />
                        {errors.endDate && <p className="text-sm text-red-500">{errors.endDate.message}</p>}
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Schedule Modules</h3>
                        <button type="button" onClick={() => append({ name: "", date: "", facilitator: "" })} className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-500">
                            <Plus size={16} /> Add Module
                        </button>
                    </div>

                    <div className="space-y-4">
                        {fields.map((field, index) => (
                            <div key={field.id} className="flex gap-4 items-start">
                                <div className="flex-1 space-y-1">
                                    <input {...register(`modules.${index}.name` as const)} className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm dark:bg-zinc-800 dark:border-gray-700" placeholder="Module Name" />
                                </div>
                                <div className="w-40 space-y-1">
                                    <input type="date" {...register(`modules.${index}.date` as const)} className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm dark:bg-zinc-800 dark:border-gray-700" />
                                </div>
                                <div className="flex-1 space-y-1">
                                    <input {...register(`modules.${index}.facilitator` as const)} className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm dark:bg-zinc-800 dark:border-gray-700" placeholder="Facilitator" />
                                </div>
                                <button type="button" onClick={() => remove(index)} className="p-2 text-gray-400 hover:text-red-500">
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex justify-end pt-4">
                    <button
                        type="submit"
                        disabled={isGenerating}
                        className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-transform hover:scale-105 hover:bg-blue-700 disabled:opacity-70 disabled:hover:scale-100"
                    >
                        {isGenerating ? <Loader2 className="animate-spin" size={20} /> : <Download size={20} />}
                        {isGenerating ? "Generating..." : "Save & Download PDF"}
                    </button>
                </div>
            </form>
        </div>
    );
}
