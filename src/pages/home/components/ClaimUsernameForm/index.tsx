import { Button, Text, TextInput } from "@ignite-ui/react";
import { ArrowRight } from "phosphor-react";
import { useForm } from "react-hook-form";
import { Form, FormAnnotation } from "./styles";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";

const claimUsernameFormSchema = z.object({
	username: z
		.string()
		.min(3, "O usuário precisa ter pelo menos 3 letras")
		.regex(/^([a-z\\\\-]+)$/i, {
			message: "O usuário pode ter apenas letras e hifens",
		})
		.transform((username) => username.toLowerCase()),
});

type claimUsernameFormData = z.infer<typeof claimUsernameFormSchema>;

export default function ClaimUsernameForm() {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<claimUsernameFormData>({
		resolver: zodResolver(claimUsernameFormSchema),
	});

	const router = useRouter();

	async function handleClaimUsername(data: claimUsernameFormData) {
		const { username } = data;
		await router.push(`/register?username=${username}`);
	}

	return (
		<>
			<Form as="form" onSubmit={handleSubmit(handleClaimUsername)}>
				<TextInput
					size="sm"
					prefix="ignite.com/"
					placeholder="seu-usuário"
					crossOrigin={undefined}
					{...register("username")}
				/>
				<Button size={"sm"} type="submit" disabled={isSubmitting}>
					Reservar
					<ArrowRight />
				</Button>
			</Form>
			<FormAnnotation>
				<Text size={"sm"}>
					{errors.username
						? errors.username.message
						: "Digite o nome do usuário desejado"}
				</Text>
			</FormAnnotation>
		</>
	);
}
