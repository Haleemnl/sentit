'use client'

import { useActionState, useState } from "react"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import MDEditor from '@uiw/react-md-editor';

import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { formSchema } from "@/lib/validation";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { createPitch } from "@/lib/actions";

const StartupForm = () => {

    const [errors, setErrors] = useState({})
    const [pitch, setPitch] = useState();
    const { toast } = useToast();
    const router = useRouter();


    //handleFormSubmit function
    const handleFormSubmit = async (prevState, formData) => {
        try {
            const formValues = {
                title: formData.get("title"),
                description: formData.get("description"),
                category: formData.get("category"),
                link: formData.get("link"),
                pitch,
            };

            await formSchema.parseAsync(formValues);

            const result = await createPitch(prevState, formData, pitch);

            if (result.status == "SUCCESS") {
                toast({
                    title: "Success",
                    description: "Your startup pitch has been created successfully",
                });

                router.push(`/startup/${result._id}`);
            }

            return result;
        } catch (error) {
            if (error instanceof z.ZodError) {
                const fieldErorrs = error.flatten().fieldErrors;

                setErrors(fieldErorrs);

                toast({
                    title: "Error",
                    description: "Please check your inputs and try again",
                    variant: "destructive",
                });

                return { ...prevState, error: "Validation failed", status: "ERROR" };
            }

            toast({
                title: "Error",
                description: "An unexpected error has occurred",
                variant: "destructive",
            });

            return {
                ...prevState,
                error: "An unexpected error has occurred",
                status: "ERROR",
            };
        }
    };

    const [state, formAction, isPending] = useActionState(handleFormSubmit,
        {
            error: '',
            status: 'INITIAL',
        }
    )
    return (
        <form action={formAction} className="startup-form">

            {/* title form */}
            <div>
                <label htmlFor="tile" className="startup-form">Title</label>
                <Input
                    id="title"
                    name="title"
                    className="startup-form_input"
                    required
                    placeholder="Startup Title"
                />

                {errors.title && <p className="startup-form_error"> {errors.title} </p>}
            </div>

            {/* Description */}
            <div>
                <label htmlFor="description" className="startup-form">Description</label>
                <Textarea
                    id="description"
                    name="description"
                    className="startup-form_input"
                    required
                    placeholder="Startup description"
                />

                {errors.description && <p className="startup-form_error"> {errors.description} </p>}
            </div>

            {/* category */}
            <div>
                <label htmlFor="category" className="startup-form">Category</label>
                <Input
                    id="category"
                    name="category"
                    className="startup-form_input"
                    required
                    placeholder="Startup category"
                />

                {errors.category && <p className="startup-form_error"> {errors.category} </p>}
            </div>

            {/* link */}
            <div>
                <label htmlFor="link" className="startup-form">Image URL</label>
                <Input
                    id="link"
                    name="link"
                    className="startup-form_input"
                    required
                    placeholder="Startup Image URL"
                />

                {errors.link && <p className="startup-form_error"> {errors.link} </p>}
            </div>

            {/* pitch */}
            <div data-color-mode='light'>
                <label htmlFor="pitch" className="startup-form">Pitch</label>
                <MDEditor
                    value={pitch}
                    onChange={(value) => setPitch(value)}
                    id='pitch'
                    preview='edit'
                    height={300}
                    style={{ borderRadius: 20, overflow: 'hidden' }}
                    textareaProps={{
                        placeholder: 'Briefly describe yout idea and what problem it solves',
                    }}
                    previewOptions={{
                        disallowdElements: ['style'],
                    }}
                />

                {errors.pitch && <p className="startup-form_error"> {errors.pitch} </p>}
            </div>

            <Button
                type="submit"
                className="startup-form_btn text-white"
                disabled={isPending}
            >
                {isPending ? "Submitting..." : "Submit Your Pitch"}
                <Send className="size-6 ml-2" />
            </Button>

        </form>
    )
}

export default StartupForm