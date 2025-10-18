import { useSettings } from '@/features/settings/useSettings'
import FormRow from '@/ui/FormRow'
import Input from '@/ui/Input'
import Spinner from '@/ui/Spinner'
import { useUpdateSetting } from './useUpdateSetting'

export default function UpdateSettingsForm() {
	const {
		isLoading,
		settings: { minBookingLength, maxBookingLength, maxGuestsPerBooking, breakfastPrice } = {},
	} = useSettings()
	const { isUpdating, updateSetting } = useUpdateSetting()

	const handleUpdate = (e: React.FocusEvent<HTMLInputElement, Element>, setting: string) => {
		const { value } = e.target

		if (!value) return

		updateSetting({
			[setting]: value,
		})
	}

	if (isLoading) {
		return (
			<div className="flex items-center justify-center">
				<Spinner />
			</div>
		)
	}

	return (
		<form className="bg-ui-50 border-ui-200 flex flex-col rounded-lg border px-8 py-4">
			<FormRow label="Minimum nights/booking">
				<Input
					type="number"
					id="min-nights"
					defaultValue={minBookingLength}
					disabled={isUpdating}
					onBlur={(e: React.FocusEvent<HTMLInputElement, Element>) =>
						handleUpdate(e, 'minBookingLength')
					}
				/>
			</FormRow>

			<FormRow label="Maximum nights/booking">
				<Input
					type="number"
					id="max-nights"
					defaultValue={maxBookingLength}
					disabled={isUpdating}
					onBlur={(e: React.FocusEvent<HTMLInputElement, Element>) =>
						handleUpdate(e, 'maxBookingLength')
					}
				/>
			</FormRow>

			<FormRow label="Maximum guests/booking">
				<Input
					type="number"
					id="max-guests"
					defaultValue={maxGuestsPerBooking}
					disabled={isUpdating}
					onBlur={(e: React.FocusEvent<HTMLInputElement, Element>) =>
						handleUpdate(e, 'maxGuestsPerBooking')
					}
				/>
			</FormRow>

			<FormRow label="Breakfast price">
				<Input
					type="number"
					id="breakfast-price"
					defaultValue={breakfastPrice}
					disabled={isUpdating}
					onBlur={(e: React.FocusEvent<HTMLInputElement, Element>) =>
						handleUpdate(e, 'breakfastPrice')
					}
				/>
			</FormRow>
		</form>
	)
}
