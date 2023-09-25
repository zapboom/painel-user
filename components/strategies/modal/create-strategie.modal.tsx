"use client";

import React, { useState } from "react";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Radio,
  RadioGroup,
} from "@nextui-org/react";
import convertColorsDouble from "@/app/functions/convert-colors-double/convert-colors-double";
import StrategieService from "@/app/services/StrategieService";
import Toast from "awesome-toast-component";

interface CreateStrategieModalProps {
  bot_id: string;
  token: string;
}

interface CreateStrategieState {
  bet_color: number;
  preset_colors: number[];
}

export default function CreateStrategieModal({
  bot_id,
  token,
}: CreateStrategieModalProps) {
  const [openModal, setOpenModal] = useState<string | undefined>();
  const props = { openModal, setOpenModal };
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [state, setState] = useState<CreateStrategieState>({
    bet_color: 0,
    preset_colors: [],
  });

  const handleEjectSignal = (color: number) => {
    let updatedColors = [...state.preset_colors];

    switch (color) {
      case 1:
      case 2:
      case 0:
        updatedColors = [...updatedColors, color];
        break;
      case -1:
        updatedColors.pop();
        break;
      default:
        break;
    }

    setState((prev) => ({
      ...prev,
      preset_colors: updatedColors,
    }));
  };

  const handleStrategieCreate = async () => {
    if (!token) return;

    const strategieService = new StrategieService(token);

    const response = await strategieService.createStrategie({
      bet_color: state.bet_color,
      preset_colors: state.preset_colors,
      bot_id,
    });

    if (typeof response === "string") {
      new Toast(response);
      return;
    }

    window.location.reload();
  };

  const handleSelectTargetColor = (color: number) => {
    switch (color) {
      case 1:
      case 2:
      case 0:
        setState((prev) => ({
          ...prev,
          bet_color: color,
        }));
        break;

      default:
        break;
    }
  };
  return (
    <>
      <div className="flex justify-end mt-4">
        <Button
          style={{
            backgroundColor: "blue",
            color: "white",
          }}
          onPress={onOpen}
        >
          Criar estratégia
        </Button>
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Criar estratégia
              </ModalHeader>
              <ModalBody>
                <div className="p-8 border-2 border-slate-900">
                  {convertColorsDouble(state.preset_colors)}
                </div>
                <p className="text-sm">Escolha seu padrão</p>
                <div className="flex gap-5">
                  <Button
                    value={2}
                    onClick={() => {
                      handleEjectSignal(2);
                    }}
                    color="primary"
                  >
                    Azul
                  </Button>
                  <Button
                    value={1}
                    onClick={() => {
                      handleEjectSignal(1);
                    }}
                    color="warning"
                  >
                    Amarelo
                  </Button>
                  <Button
                    onClick={() => {
                      handleEjectSignal(0);
                    }}
                    value={0}
                    color="default"
                  >
                    Branco
                  </Button>
                  <Button
                    onClick={() => {
                      handleEjectSignal(-1);
                    }}
                    value={-1}
                    color="danger"
                  >
                    Remover cor
                  </Button>
                </div>
                <RadioGroup label="Escolha a cor alvo" orientation="vertical">
                  <Radio
                    onClick={() => {
                      handleSelectTargetColor(1);
                    }}
                    value={"1"}
                  >
                    🟡
                  </Radio>
                  <Radio
                    onClick={() => {
                      handleSelectTargetColor(2);
                    }}
                    value={"2"}
                  >
                    🔵
                  </Radio>
                  <Radio
                    onClick={() => {
                      handleSelectTargetColor(0);
                    }}
                    value={"0"}
                  >
                    ⚪
                  </Radio>
                </RadioGroup>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Fechar
                </Button>
                <Button
                  color="primary"
                  onPress={async () => {
                    await handleStrategieCreate();
                    onClose();
                  }}
                >
                  Criar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
